/*
	名字:	獅子王城
	地圖:	第三座塔
	描述:	211060600
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("q3141");

	eim.setInstanceMap(211060601).resetFully();

	eim.startEventTimer(10 * 60000); //1分鐘

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(211060601), eim.getMapInstance(211060601).getPortal(1));
	eim.getMapInstance(211060601).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Eliminate the Prison Guard Rhino on the Roof of the Third Tower."));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 211060600);
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (eim.getMapInstance(211060601).getAllMonstersThreadsafe().size() < 1) {

		player.updateInfoQuest(3141, "clear=1;clear=1");

		player.updateQuest(player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3141)), true);

		eim.getMapInstance(211060601).broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("The third magic ward in the Lion King's Castle has been broken."));
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 211060601) {
		playerExit(eim, player);
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