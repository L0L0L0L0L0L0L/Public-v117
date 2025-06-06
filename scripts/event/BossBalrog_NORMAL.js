/*
	名字:	武英
	地圖:	神殿底層
	描述:	105100100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("BossBalrog_NORMAL");

	eim.setInstanceMap(105100400).resetFully();
	eim.setInstanceMap(105100401).resetFully();

	eim.schedule("BossBalrog", 3 * 1000);//加載指定時間
	eim.schedule("releaseLeftClaw", 1 * 60000);//加載指定時間

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(105100400), eim.getMapInstance(105100400).getPortal(0));
}

function BossBalrog(eim) {//刷出BOSS如果不這樣設置 無法正常顯示主體

	//eim.getMapInstance(105100400).spawnFakeMonsterOnGroundBelow(em.getMonster(8830000), new java.awt.Point(412, 258));//刷出假怪無法正常顯示

	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830003), new java.awt.Point(412, 258));
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830002), new java.awt.Point(412, 258));
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830006), new java.awt.Point(412, 258));
}

function releaseLeftClaw(eim) {//指定時間秒殺怪物釋放左爪
	eim.getMapInstance(105100400).killMonster(8830006);
	eim.schedule("releaseLeftClaw1", 2 * 1000);//加載指定時間
}

function releaseLeftClaw1(eim) {//刷出左爪
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830001), new java.awt.Point(412, 258));
}

function releaseLeftClaw2(eim) {//刷出消滅後的左爪
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830004), new java.awt.Point(412, 258));
}

function releaserightClaw2(eim) {//刷出消灭后右爪
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830005), new java.awt.Point(412, 258));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 105100100);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8830002) {//右爪被消滅後
		eim.schedule("releaserightClaw2", 3 * 1000);//加載指定時間
		}
	if (mob.getId() == 8830001) {//左爪被消滅後釋放主體
		eim.getMapInstance(105100400).killMonster(8830003);

		eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(em.getMonster(8830000), new java.awt.Point(412, 258));
		eim.schedule("releaseLeftClaw2", 3 * 1000);//加載指定時間
		}
	if (mob.getId() == 8830000) {//主體被消滅
		eim.schedule("SealedBalrog", 10 * 1000);//加載指定時間
		eim.startEventTimer(3 * 60000);

		Qa = player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getCustomData();

	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getStatus() == 1) {
		player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).setCustomData(Qa == null ? 1 : parseInt(Qa) + 1);
		}

	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2239)).getStatus() == 1) {
		player.mobKilled(9101003, 1);//添加任務怪物計數
		}
		}
		return 1;
}

function SealedBalrog(eim) {//主體被消滅後的指定時間
	for (var i = 0; i < eim.getPlayers().size(); i++) {
		eim.getPlayers().get(i).changeMap(105100401, 0);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 105100400 && mapid != 105100401) {
		playerExit(eim, chr);
}
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function leftParty(eim, player) {}//離開小組觸發

function disbandParty(eim) {}//小組退出時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件