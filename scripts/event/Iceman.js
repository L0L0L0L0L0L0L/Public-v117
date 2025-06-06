/*
	名字:	冰雪平原
	地圖:	冰雪平原入口
	描述:	932000000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("Iceman");

	eim.setInstanceMap(932000100).resetFully();
	eim.setInstanceMap(932000200).resetFully();
	eim.setInstanceMap(932000300).resetFully();
	eim.setInstanceMap(932000400).resetFully();

	eim.startEventTimer(20 * 60000); //20 mins

	respawnStages(eim); //加載迴圈事件

	return eim;
}

function respawnStages(eim) {//監控地圖時間
	if (eim.getMapInstance(932000100).getMonsterById(9300438) != null) {
	if (eim.getMapInstance(932000100).getMonsterById(9300438).getPosition().x > 1700 && eim.getProperty("stage1") == null) {
		eim.getMapInstance(932000100).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(932000100).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(932000100).startMapEffect("Whew. I'm glad we've come this far. Let's move on to the next stage.", 5120051);
		eim.setProperty("stage1", 1);
		}
		}
	if (eim.getMapInstance(932000200).getMonsterById(9300438) != null) {
	if (eim.getMapInstance(932000200).getMonsterById(9300438).getPosition().y < -700 && eim.getProperty("stage2") == null) {
		eim.getMapInstance(932000200).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(932000200).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(932000200).startMapEffect("Please wait for a moment. I am coming.", 5120051);
		eim.setProperty("stage2", 1);
		}
		}
		eim.schedule("respawnStages", 1 * 1000);
}

function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(932000100), eim.getMapInstance(932000100).getPortal(0));
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9300438) {
		mob.getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(6, "You have failed the mission because the monster you were guarding died."));
		eim.startEventTimer(10 * 1000);
		}
	if (mob.getId() == 9300442) {
		//eim.getMapInstance(932000300).broadcastMessage(Packages.tools.packet.CField.NPCPacket.removeNPCController(2159021));
		eim.getMapInstance(932000300).spawnNpc(2159017, new java.awt.Point(-380, 154));
		eim.getMapInstance(932000300).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(932000300).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(932000300).startMapEffect("The Ice Knight's curse will never end. It will repeat over and over again into eternity. Hahaha!", 5120050);

		player.gainExp(player.getLevel() * 500, true, true, true);
	if (player.getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1218)).getStatus() < 2) {
		Packages.server.quest.MapleQuest.getInstance(1218).forceComplete(player, 0);
		player.getClient().getSession().write(Packages.tools.packet.CWvsContext.getShowQuestCompletion(1218));
		}
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 932000000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 932000100 || mapid > 932000400) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	player.changeMap(eim.getMapInstance(932000000), eim.getMapInstance(932000000).getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 932000000);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件