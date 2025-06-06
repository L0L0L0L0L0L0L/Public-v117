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
package server.maps;

import client.MapleCharacter;
import client.MapleTrait.MapleTraitType;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.world.MaplePartyCharacter;
import java.awt.Point;
import server.Randomizer;
import server.Timer.MapTimer;
import server.life.MapleLifeFactory;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.packet.CField.NPCPacket;
import tools.packet.CWvsContext;

public class Event_DojoAgent {

    private final static int baseAgentMapId = 970030000; // 9500337 = mano
    private final static Point point1 = new Point(140, 0),
            point2 = new Point(-193, 0),
            point3 = new Point(355, 0);

    public static boolean warpStartDojo(final MapleCharacter c, final boolean party) {
        int stage = 1;
        if (party || stage <= -1 || stage > 47) {
            stage = 1;
        }
        int mapid = 925020000 + (stage * 100);
        boolean canenter = false;
        final ChannelServer ch = c.getClient().getChannelServer();
        for (int x = 0; x < 8; x++) { //每樓8張地圖
            boolean canenterr = true;
            for (int i = 1; i < 48; i++) { //47樓
                MapleMap map = ch.getMapFactory().getMap(925020000 + 100 * i + x);
                if (map.getCharactersSize() > 0) {
                    canenterr = false;
                    c.getClient().getSession().write(NPCPacket.getNPCTalk(2091005, (byte) 0, "Hey~Hey, all dojos are in use, please be patient.", "00 00", (byte) 0));
                    break;
                } else {
                    clearMap(map, false);
                }
            }
            if (canenterr) {
                canenter = true;
                mapid += x;
                break;
            }
        }
        final MapleMap map = ch.getMapFactory().getMap(mapid);
        final MapleMap mapidd = c.getMap();
        if (canenter) {
            c.changeMap(map, map.getPortal(0));
            spawnMonster(c, map, stage);
        }
        return canenter;
    }

    public static void failed(final MapleCharacter c) {
        final MapleMap currentmap = c.getMap();
        final MapleMap deadMap = c.getClient().getChannelServer().getMapFactory().getMap(925020002);
        if (c.getParty() != null && c.getParty().getMembers().size() > 1) {
            for (MaplePartyCharacter mem : c.getParty().getMembers()) {
                MapleCharacter chr = currentmap.getCharacterById(mem.getId());
                if (chr != null) {
                    chr.changeMap(deadMap, deadMap.getPortal(0));
                }
            }
        }
    }

    // Resting rooms :
    // 925020600 ~ 925020609
    // 925021200 ~ 925021209
    // 925021800 ~ 925021809
    // 925022400 ~ 925022409
    // 925023000 ~ 925023009
    // 925023600 ~ 925023609
    public static boolean warpNextMap(final MapleCharacter c, final boolean fromResting, final MapleMap currentmap) {
        try {
            final int temp = (currentmap.getId() - 925000000) / 100;
            final int thisStage = (int) (temp - ((temp / 100) * 100));
            final ChannelServer ch = c.getClient().getChannelServer();
            final MapleMap deadMap = ch.getMapFactory().getMap(925020002);
            if (!c.isAlive()) { //shouldn't happen
                c.changeMap(deadMap, deadMap.getPortal(0));
                return true;
            }
            final MapleMap map = ch.getMapFactory().getMap(currentmap.getId() + 100);
            if (!fromResting && map != null) {
                clearMap(currentmap, true);
            }
            if (currentmap.getId() >= 925024700 && currentmap.getId() <= 925024709) {//47樓
                final MapleMap lastMap = ch.getMapFactory().getMap(925020003);
                c.changeMap(lastMap, lastMap.getPortal(1));
                c.modifyCSPoints(1, 5000, true);
                return true;
            }
            //final int nextmapid = 925020000 + ((thisStage + 1) * 100);
            if (map != null && map.getCharactersSize() == 0) {
                clearMap(map, false);
                c.changeMap(map, map.getPortal(0));
                spawnMonster(c, map, thisStage + 1);
                return true;
            } else if (map != null) { //出現地圖有人的情況
                int basemap = currentmap.getId() / 100 * 100 + 100;
                for (int x = 0; x < 10; x++) {
                    MapleMap mapz = ch.getMapFactory().getMap(basemap + x);
                    if (mapz.getCharactersSize() == 0) {
                        clearMap(mapz, false);
                        c.changeMap(mapz, mapz.getPortal(0));
                        spawnMonster(c, mapz, thisStage + 1);
                        return true;
                    }
                }
            }
            final MapleMap mappz = ch.getMapFactory().getMap(925020001);
            c.dropMessage(5, "An error has occurred and you shall be brought to the beginning.");
            c.changeMap(mappz, mappz.getPortal(0));

        } catch (Exception rm) {
            rm.printStackTrace();
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, rm);
        }
        return false;
    }

    private static final void clearMap(final MapleMap map, final boolean check) {
        if (check) {
            if (map.getCharactersSize() != 0) {
                return;
            }
        }
        map.resetFully();
    }

    private static final void spawnMonster(final MapleCharacter c, final MapleMap map, final int stage) {
        final int mobid;
        boolean x = c.getQuestNAdd(MapleQuest.getInstance(150100)).getCustomData().equals("1");
        boolean y = c.getQuestNAdd(MapleQuest.getInstance(150100)).getCustomData().equals("2");
        final int z = x ? 0 : y ? 100 : 200;
        switch (stage) {
            case 1:
                mobid = 9305100 + z; // 紅寶王
                break;
            case 2:
                mobid = 9305101 + z; // 菇菇王
                break;
            case 3:
                mobid = 9305102 + z; // 樹妖王
                break;
            case 4:
                mobid = 9305103 + z; // 藍色菇菇王
                break;
            case 5:
                mobid = 9305104 + z; // 殭屍菇菇王
                break;
            case 7:
                mobid = 9305105 + z; // 超級綠水靈
                break;
            case 8:
                mobid = 9305106 + z; // 沼澤巨鱷
                break;
            case 9:
                mobid = 9305107 + z; // 巨居蟹
                break;
            case 10:
                mobid = 9305108 + z; // 殭屍猴王
                break;
            case 11:
                mobid = 9305109 + z; // 搖滾精神
                break;
            case 13:
                mobid = 9305110 + z; // 金屬巨人
                break;
            case 14:
                mobid = 9305111 + z; // 艾利傑
                break;
            case 15:
                mobid = 9305112 + z; // 巴洛古
                break;
            case 16:
                mobid = 9305113 + z; // 九尾妖狐
                break;
            case 17:
                mobid = 9305114 + z; // 薛西斯
                break;
            case 19:
                mobid = 9305115 + z; // 仙人長老
                break;
            case 20:
                mobid = 9305116 + z; // 葛雷金剛
                break;
            case 21:
                mobid = 9305117 + z; // 咕咕鐘
                break;
            case 22:
                mobid = 9305118 + z; // 路邊攤
                break;
            case 23:
                mobid = 9305119 + z; // 肯德熊
                break;
            case 25:
                mobid = 9305120 + z; // 遠古精靈
                break;
            case 26:
                mobid = 9305121 + z; // 巨型戰鬥機
                break;
            case 27:
                mobid = 9305122 + z; // 金鈎海賊王
                break;
            case 28:
                mobid = 9305123 + z; // 迪特和洛依
                break;
            case 29:
                mobid = 9305124 + z; // 法郎肯洛伊德
                break;
            case 31:
                mobid = 9305125 + z; // 奇美拉
                break;
            case 32:
                mobid = 9305126 + z; // 毒石巨人
                break;
            case 33:
                mobid = 9305127 + z; // 喵怪仙人
                break;
            case 34:
                mobid = 9305128 + z; // 蜈蚣大王
                break;
            case 35:
                mobid = 9305129 + z; // 地獄巴洛古
                break;
            case 37:
                mobid = 9305130 + z; // 噴火龍
                break;
            case 38:
                mobid = 9305131 + z; // 格瑞芬多
                break;
            case 39:
                mobid = 9305132 + z; // 雪毛怪人
                break;
            case 40:
                mobid = 9305133 + z; // 拉圖斯
                break;
            case 41:
                mobid = 9305134 + z; // 亞尼
                break;
            case 43:
                mobid = 9305135 + z; // 寒霜冰龍
                break;
            case 44:
                mobid = 9305136 + z; // 多多
                break;
            case 45:
                mobid = 9305137 + z; // 利里諾斯
                break;
            case 46:
                mobid = 9305138 + z; // 萊伊卡
                break;
            case 47:
                mobid = 9305139 + z; // 武公
                break;
            default:
                return;
        }
        if (mobid != 0) {
            final int rand = Randomizer.nextInt(3);

            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    map.spawnMonsterWithEffect(MapleLifeFactory.getMonster(mobid), 15, rand == 0 ? point1 : rand == 1 ? point2 : point3);
                }
            }, 3000);
        }
    }
}