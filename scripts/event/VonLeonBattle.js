/*
	名字:	獅子王城
	地圖:	見面室前走道
	描述:	211070000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("VonLeonBattle");

	eim.setInstanceMap(211070100).resetFully();

	eim.setInstanceMap(211070100).spawnNpc(2161000, new java.awt.Point(0, -181));

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(211070100), eim.getMapInstance(211070100).getPortal(3));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 211061001);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 8840000) {
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 211070100 && mapid != 211070101 && mapid != 211070110) {
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