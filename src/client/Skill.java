/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package client;

import constants.GameConstants;
import java.util.ArrayList;
import java.util.List;
import provider.MapleData;
import provider.MapleDataTool;
import server.MapleStatEffect;
import server.Randomizer;
import server.life.Element;
import tools.Pair;

public class Skill {

    private String name = "";
    private final List<MapleStatEffect> effects = new ArrayList<>();
    private List<MapleStatEffect> pvpEffects = null;
    private List<Integer> animation = null;
    private final List<Pair<Integer, Byte>> requiredSkill = new ArrayList<>();
    private Element element = Element.NEUTRAL;
    private int id, animationTime = 0, masterLevel = 0, maxLevel = 0, delay = 0, trueMax = 0, eventTamingMob = 0, skillType = 0; //4 is alert
    private boolean invisible = false, chargeskill = false, timeLimited = false, combatOrders = false, pvpDisabled = false, magic = false, casterMove = false, pushTarget = false, pullTarget = false;

    public Skill(final int id) {
        super();
        this.id = id;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static Skill loadFromData(final int id, final MapleData data, final MapleData delayData) {
        Skill ret = new Skill(id);

        boolean isBuff;
        final int skillType = MapleDataTool.getInt("skillType", data, -1);
        final String elem = MapleDataTool.getString("elemAttr", data, null);
        if (elem != null) {
            ret.element = Element.getFromChar(elem.charAt(0));
        }
        ret.skillType = skillType;
        ret.invisible = MapleDataTool.getInt("invisible", data, 0) > 0;
        ret.timeLimited = MapleDataTool.getInt("timeLimited", data, 0) > 0;
        ret.combatOrders = MapleDataTool.getInt("combatOrders", data, 0) > 0;
        ret.masterLevel = MapleDataTool.getInt("masterLevel", data, 0);
        ret.eventTamingMob = MapleDataTool.getInt("eventTamingMob", data, 0);
        final MapleData inf = data.getChildByPath("info");
        if (inf != null) {
            ret.pvpDisabled = MapleDataTool.getInt("pvp", inf, 1) <= 0;
            ret.magic = MapleDataTool.getInt("magicDamage", inf, 0) > 0;
            ret.casterMove = MapleDataTool.getInt("casterMove", inf, 0) > 0;
            ret.pushTarget = MapleDataTool.getInt("pushTarget", inf, 0) > 0;
            ret.pullTarget = MapleDataTool.getInt("pullTarget", inf, 0) > 0;
        }
        final MapleData effect = data.getChildByPath("effect");
        if (skillType == 2) {
            isBuff = true;
        } else if (skillType == 3) { //final attack
            ret.animation = new ArrayList<>();
            ret.animation.add(0);
            isBuff = effect != null;
        } else {
            MapleData action_ = data.getChildByPath("action");
            final MapleData hit = data.getChildByPath("hit");
            final MapleData ball = data.getChildByPath("ball");

            boolean action = false;
            if (action_ == null) {
                if (data.getChildByPath("prepare/action") != null) {
                    action_ = data.getChildByPath("prepare/action");
                    action = true;
                }
            }
            isBuff = effect != null && hit == null && ball == null;
            if (action_ != null) {
                String d;
                if (action) { //prepare
                    d = MapleDataTool.getString(action_, null);
                } else {
                    d = MapleDataTool.getString("0", action_, null);
                }
                if (d != null) {
                    isBuff |= d.equals("alert2");
                    final MapleData dd = delayData.getChildByPath(d);
                    if (dd != null) {
                        for (MapleData del : dd) {
                            ret.delay += Math.abs(MapleDataTool.getInt("delay", del, 0));
                        }
                        if (ret.delay > 30) { //then, faster(2) = (10+2)/16 which is basically 3/4
                            ret.delay = (int) Math.round(ret.delay * 11.0 / 16.0); //fastest(1) lolol
                            ret.delay -= (ret.delay % 30); //round to 30ms
                        }
                    }
                    if (SkillFactory.getDelay(d) != null) { //this should return true always
                        ret.animation = new ArrayList<>();
                        ret.animation.add(SkillFactory.getDelay(d));
                        if (!action) {
                            for (MapleData ddc : action_) {
                                if (!MapleDataTool.getString(ddc, d).equals(d)) {
                                    String c = MapleDataTool.getString(ddc);
                                    if (SkillFactory.getDelay(c) != null) {
                                        ret.animation.add(SkillFactory.getDelay(c));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            switch (id) {
                case 1076:
                case 11076:
                case 2111002: // explosion
                case 2111003: // poison mist
                case 2121001: // Big bang
                case 2221001: // Big bang
                case 2301002: // heal is alert2 but not overtime...
                case 2321001: // Big bang
                case 4211001: // chakra
                case 12111005: // Flame Gear
                case 22161003: //聖療之光
                case 32121006: //魔法屏障
                    isBuff = false;
                    break;
                case 93:
                case 1004: // monster riding
                case 1026:
                case 1111002: // combo
                case 1111007:
                case 1211009:
                case 1220013:
                case 1311007: //magic,armor,atk crash
                case 1320009: //beholder's buff.. passive
                case 2120010:
                case 2121009:
                case 2220010:
                case 2221009:
                case 2311006: //magic booster
                case 2320011:
                case 2321010:
                case 3120006:
                case 3220005:
                case 4111001: // mesoup
                case 4211003: // pickpocket
                case 4311009:
                case 4321000: //tornado spin
                case 4331003: //owl spirit
                case 4341002:
                case 5001005: //dash
                case 5110001: //energy charge
                case 5111005: // Transformation
                case 5111007: //幸運骰子
                case 5111010:
                case 5120011:
                case 5121003: // Super Transformation
                case 5121009: //speed infusion
                case 5120012:
                case 5121015:
                case 5211002:
                case 5211006: //homing beacon
                case 5211007: //幸運骰子
                case 5211009: //魔法彈丸
                case 5211014: // Pirate octopus summon
                case 5220002: // wrath of the octopi
                case 5220011: //bullseye
                case 5220012:
                case 5220014:
                case 5311004:
                case 5311005:
                case 5320007:
                case 5321003:
                case 5321004:
                case 5701005: //迅雷再起
                case 5711001: //破城砲
                case 5711011: //幸運骰子
                case 5720005: //雙倍幸運骰子
                case 5720012: //反擊
                case 5721003: //精準砲擊
                case 10000093:
                case 10001004:
                case 10001026:
                case 13111005: // Alabtross
                case 15001003:
                case 15100004:
                case 15101006: //spark
                case 15111002: // Super Transformation
                case 15111005:
                case 15111006: //spark
                case 20000093:
                case 20001004:
                case 20001026:
                case 20010093:
                case 20011004:
                case 20011026:
                case 20020093:
                case 20021026:
                case 20031205:
                case 20031209: //卡牌審判
                case 20031210: //審判
                case 21000000: //矛之鬥氣
                case 21101003: //強化連擊
                case 22131001: //守護之力
                case 22131002: //自然力重置
                case 22141002: //極速詠唱
                case 22151002: //襲殺翼
                case 22151003: //魔法抵抗．改
                case 22161002: //鬼神詛咒
                case 22161004: //龍神的庇護
                case 22171004: //楓葉淨化
                case 22181000: //龍神的祝福
                case 22181003: //靈魂之石
                case 22181004: //歐尼斯的意志
                case 24101005: //極速手杖
                case 24121008: //楓葉祝福
                case 24121009: // hero's will
                case 30000093:
                case 30001026:
                case 30010093:
                case 30011026:
                case 31121005: //變形
                case 32001003: //dark aura
                case 32101003: //yellow aura
                case 32110000:
                case 32111005:
                case 32110007:
                case 32110008:
                case 32110009:
                case 32111006:
                case 32111012: //blue aura
                case 32120000:
                case 32120001:
                case 32121003: //twister
                case 33101006: //jaguar oshi
                case 33111003: //瘋狂陷阱
                case 35001001: //火焰發射
                case 35001002: //合金盔甲: 原型
                case 35101005: //開放通道 : GX-9
                case 35101007: //全備型盔甲 (Perfect Armor)
                case 35101009:	
                case 35111001: //賽特拉特
                case 35111002: //磁場
                case 35111004: //合金盔甲: 重機槍
                case 35111005: //加速器 : EX-7
                case 35111009:
                case 35111010:
                case 35111011: //治療機器人 : H-LX
                case 35111013: //幸運骰子
                case 35120000: //合金盔甲終極
                case 35121003: //戰鬥機器 : 巨人錘
                case 35121005: //合金盔甲: 導彈罐
                case 35121006: //終極賽特拉特
                case 35121009: //機器人工廠 : RM1
                case 35121010: //擴音器 : AF-11
                case 35121013: //合金盔甲: 重機槍
                case 51111005: //魔防消除
                case 51121000:
                case 51121005:
                case 51121006:
                case 80001000:
                case 80001089:
               // case 9101004: // hide is a buff -.- atleast for us o.o"
                    isBuff = true;
                    break;
            }
        }
        ret.chargeskill = data.getChildByPath("keydown") != null;
        //some skills have old system, some new
        final MapleData level = data.getChildByPath("common");
        if (level != null) {
            ret.maxLevel = MapleDataTool.getInt("maxLevel", level, 1); //10 just a failsafe, shouldn't actually happens
            ret.trueMax = ret.maxLevel + (ret.combatOrders ? 2 : 0);
            for (int i = 1; i <= ret.trueMax; i++) {
                ret.effects.add(MapleStatEffect.loadSkillEffectFromData(level, id, isBuff, i, "x"));
            }

        } else {
            for (final MapleData leve : data.getChildByPath("level")) {
                ret.effects.add(MapleStatEffect.loadSkillEffectFromData(leve, id, isBuff, Byte.parseByte(leve.getName()), null));
            }
            ret.maxLevel = ret.effects.size();
            ret.trueMax = ret.effects.size();
        }
        final MapleData level2 = data.getChildByPath("PVPcommon");
        if (level2 != null) {
            ret.pvpEffects = new ArrayList<>();
            for (int i = 1; i <= ret.trueMax; i++) {
                ret.pvpEffects.add(MapleStatEffect.loadSkillEffectFromData(level2, id, isBuff, i, "x"));
            }
        }
        final MapleData reqDataRoot = data.getChildByPath("req");
        if (reqDataRoot != null) {
            for (final MapleData reqData : reqDataRoot.getChildren()) {
                ret.requiredSkill.add(new Pair<>(Integer.parseInt(reqData.getName()), (byte) MapleDataTool.getInt(reqData, 1)));
            }
        }
        ret.animationTime = 0;
        if (effect != null) {
            for (final MapleData effectEntry : effect) {
                ret.animationTime += MapleDataTool.getIntConvert("delay", effectEntry, 0);
            }
        }
        return ret;
    }

    public MapleStatEffect getEffect(final int level) {
        if (effects.size() < level) {
            if (effects.size() > 0) { //incAllskill
                return effects.get(effects.size() - 1);
            }
            return null;
        } else if (level <= 0) {
            return effects.get(0);
        }
        return effects.get(level - 1);
    }

    public MapleStatEffect getPVPEffect(final int level) {
        if (pvpEffects == null) {
            return getEffect(level);
        }
        if (pvpEffects.size() < level) {
            if (pvpEffects.size() > 0) { //incAllskill
                return pvpEffects.get(pvpEffects.size() - 1);
            }
            return null;
        } else if (level <= 0) {
            return pvpEffects.get(0);
        }
        return pvpEffects.get(level - 1);
    }

    public int getSkillType() {
        return skillType;
    }

    public List<Integer> getAllAnimation() {
        return animation;
    }

    public int getAnimation() {
        if (animation == null) {
            return -1;
        }
        return animation.get(Randomizer.nextInt(animation.size()));
    }

    public boolean isPVPDisabled() {
        return pvpDisabled;
    }

    public boolean isChargeSkill() {
        return chargeskill;
    }

    public boolean isInvisible() {
        return invisible;
    }

    public boolean hasRequiredSkill() {
        return requiredSkill.size() > 0;
    }

    public List<Pair<Integer, Byte>> getRequiredSkills() {
        return requiredSkill;
    }

    public int getMaxLevel() {
        return maxLevel;
    }

    public int getTrueMax() {
        return trueMax;
    }

    public boolean combatOrders() {
        return combatOrders;
    }

    public boolean canBeLearnedBy(int job) {
        int jid = job;
        int skillForJob = id / 10000;
        if (skillForJob == 2001) {
            return GameConstants.isEvan(job); //special exception for beginner -.-
        }
        if (skillForJob == 0) {
            return GameConstants.isAdventurer(job); //special exception for beginner
        }
        if (skillForJob == 1000) {
            return GameConstants.isKOC(job); //special exception for beginner
        }
        if (skillForJob == 2000) {
            return GameConstants.isAran(job); //special exception for beginner
        }
        if (skillForJob == 3000) {
            return GameConstants.isResist(job); //special exception for beginner
        }
        if (skillForJob == 1) {
            return GameConstants.isCannon(job); //special exception for beginner
        }
        if (skillForJob == 3001) {
            return GameConstants.isDemon(job); //special exception for beginner
        }
        if (skillForJob == 2002) {
            return GameConstants.isMercedes(job); //special exception for beginner
        }
        if (jid / 100 != skillForJob / 100) { // wrong job
            return false;
        }
        if (jid / 1000 != skillForJob / 1000) { // wrong job
            return false;
        }
        if ((GameConstants.isPhantom(skillForJob)) && (!GameConstants.isPhantom(job))) {
            return false;
        }
        if ((GameConstants.isJett(skillForJob)) && (!GameConstants.isJett(job))) {
            return false;
        }
        if ((GameConstants.isMihile(skillForJob)) && (!GameConstants.isMihile(job))) {
            return false;
        }
        if (GameConstants.isCannon(skillForJob) && !GameConstants.isCannon(job)) {
            return false;
        }
        if (GameConstants.isDemon(skillForJob) && !GameConstants.isDemon(job)) {
            return false;
        }
        if (GameConstants.isAdventurer(skillForJob) && !GameConstants.isAdventurer(job)) {
            return false;
        }
        if (GameConstants.isKOC(skillForJob) && !GameConstants.isKOC(job)) {
            return false;
        }
        if (GameConstants.isAran(skillForJob) && !GameConstants.isAran(job)) {
            return false;
        }
        if (GameConstants.isEvan(skillForJob) && !GameConstants.isEvan(job)) {
            return false;
        }
        if (GameConstants.isMercedes(skillForJob) && !GameConstants.isMercedes(job)) {
            return false;
        }
        if (GameConstants.isResist(skillForJob) && !GameConstants.isResist(job)) {
            return false;
        }
        if ((jid / 10) % 10 == 0 && (skillForJob / 10) % 10 > (jid / 10) % 10) { // wrong 2nd job
            return false;
        }
        if ((skillForJob / 10) % 10 != 0 && (skillForJob / 10) % 10 != (jid / 10) % 10) { //wrong 2nd job
            return false;
        }
        return true;
    }

    public boolean isTimeLimited() {
        return timeLimited;
    }

    public boolean isFourthJob() {
        switch (this.id) {
        case 1120012:
        case 3110014:
        case 4320005:
        case 4340010:
        case 4340012:
        case 5120011:
        case 5120012:
        case 5220012:
        case 5220014:
        case 5321006:
        case 5720008:
        case 5720012: //反擊
        case 21120011: //快速移動
        case 21120014:
        case 22171004: //楓葉淨化
        case 22181004: //歐尼斯的意志
        case 23120011: //旋風月光翻轉
        case 23120013:
        case 23121008:
        case 33120010: //狂暴天性
        case 33121005: //化學彈丸
            return false;
        }
        switch (this.id / 10000) {
        case 2217:
        case 2218:
        case 2312:
        case 2412:
        case 2512:
        case 2712:
        case 3122:
            return true;
        }
        if ((getMaxLevel() <= 15) && (!this.invisible) && (getMasterLevel() <= 0)) {
            return false;
        }
        if ((this.id / 10000 >= 2210) && (this.id / 10000 < 3000)) {
            return (this.id / 10000 % 10 >= 7) || (getMasterLevel() > 0);
        }
        if ((this.id / 10000 >= 430) && (this.id / 10000 <= 434)) {
            return (this.id / 10000 % 10 == 4) || (getMasterLevel() > 0);
        }
        return (this.id / 10000 % 10 == 2) && (this.id < 90000000) && (!isBeginnerSkill());
    }

    public Element getElement() {
        return element;
    }

    public int getAnimationTime() {
        return animationTime;
    }

    public int getMasterLevel() {
        return masterLevel;
    }

    public int getDelay() {
        return delay;
    }

    public int getTamingMob() {
        return eventTamingMob;
    }

    public boolean isBeginnerSkill() {
        int jobId = id / 10000;
        return GameConstants.isBeginnerJob(jobId);
    }

    public boolean isMagic() {
        return magic;
    }

    public boolean isMovement() {
        return casterMove;
    }

    public boolean isPush() {
        return pushTarget;
    }

    public boolean isPull() {
        return pullTarget;
    }

    public boolean isSpecialSkill() {
        int jobId = id / 10000;
        return jobId == 900 || jobId == 800 || jobId == 9000 || jobId == 9200 || jobId == 9201 || jobId == 9202 || jobId == 9203 || jobId == 9204;
    }
}
