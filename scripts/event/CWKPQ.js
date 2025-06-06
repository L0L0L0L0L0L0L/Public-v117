/*
	名字:	杰克恩
	地圖:	通往秘密的大厅
	描述:	610030020
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(channel) {//開始事件，時間
	em.setProperty("state", 1);

	eim = em.newInstance("CWKPQ");

	eim.setProperty("boss", 0);

	eim.setInstanceMap(610030100).resetFully();
	eim.setInstanceMap(610030200).resetFully();
	eim.setInstanceMap(610030300).resetFully();
	eim.setInstanceMap(610030400).resetFully();
	eim.setInstanceMap(610030500).resetFully();
	eim.setInstanceMap(610030510).resetFully();
	eim.setInstanceMap(610030520).resetFully();
	eim.setInstanceMap(610030521).resetFully();
	eim.setInstanceMap(610030522).resetFully();
	eim.setInstanceMap(610030530).resetFully();
	eim.setInstanceMap(610030540).resetFully();
	eim.setInstanceMap(610030550).resetFully();
	eim.setInstanceMap(610030600).resetFully();
	eim.setInstanceMap(610030700).resetFully();
	eim.setInstanceMap(610030800).resetFully();

	eim.setInstanceMap(610030400).getReactorByName("4skill0a").forceHitReactor(1);//攻擊一次顯示出反應堆
	eim.setInstanceMap(610030400).getReactorByName("4skill1a").forceHitReactor(1);
	eim.setInstanceMap(610030400).getReactorByName("4skill2a").forceHitReactor(1);
	eim.setInstanceMap(610030400).getReactorByName("4skill3a").forceHitReactor(1);
	eim.setInstanceMap(610030400).getReactorByName("4skill4a").forceHitReactor(1);

	eim.registerMonster(em.getMonster(9400594));

	eim.setInstanceMap(610030540).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(944, -204));
	eim.setInstanceMap(610030540).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(401, -384));
	eim.setInstanceMap(610030540).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(28, -504));
	eim.setInstanceMap(610030540).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(-332, -384));
	eim.setInstanceMap(610030540).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(-855, -204));

	eim.setInstanceMap(610030550).shuffleReactors();

	//add environments添加環境
	var a = Array("a", "b", "c", "d", "e", "f", "g", "h", "i");

	for (var x = 0; x < a.length; x++) {
	for (var y = 1; y <= 7; y++) {
	if (x == 1 || x == 3 || x == 4 || x == 6 || x == 8) {
	if (y != 2 && y != 4 && y != 5 && y != 7) {
		eim.setInstanceMap(610030400).moveEnvironment(a[x] + "" + y, 1);
		}
		}
	if (x == 0 || x == 2 || x == 5 || x == 7) {
		eim.setInstanceMap(610030400).moveEnvironment(a[x] + "" + y, 1);
		}
		}
		}
		eim.startEventTimer(3 * 60000);//初入地圖時間

		eim.schedule("spawnGuardians", 30 * 1000);//30秒後啟動指定事件

		return eim;
}


function playerEntry(eim, player) {//傳送進事件地圖
	player.changeMap(eim.getMapInstance(610030100), eim.getMapInstance(610030100).getPortal(0));
}

function spawnGuardians(eim) {//指定时间事件
	if (eim.getMapInstance(610030100).getCharacters().size() < 1) {//地圖人數條件
		return;
		}
		eim.getMapInstance(610030100).getReactorByName("mob0").forceHitReactor(1);//給予條件
		eim.getMapInstance(610030100).broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "Your whereabouts have been discovered, please find the entrance as soon as possible."));
	for (var i = 0; i < 20; i++) {

		eim.getMapInstance(610030100).spawnMonsterOnGroundBelow(em.getMonster(9400594), new java.awt.Point(130 + (Math.random() * 1000), 336));
}
}

function monsterValue(eim, player, mob) {//殺怪後觸發
	if (mob.getId() == 9400589 || mob.getId() == 9400590 || mob.getId() == 9400591 || mob.getId() == 9400592 || mob.getId() == 9400593) {
		var boss = parseInt(eim.getProperty("boss")) + 1;
		eim.setProperty("boss", boss);
	if (eim.getProperty("boss") > 4) {
		eim.startEventTimer(3 * 60000);//60000 = 1分鐘
		eim.getMapInstance(610030600).broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(610030600).broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
		}
		}
		return 1;
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	switch(mapid) {
	case 610030200:
		if (eim.getProperty("time2") == null) {
			eim.restartEventTimer(10 * 60000); //10 mins
			eim.setProperty("time2", 1);
			}
			break;
	case 610030300:
		if (eim.getProperty("time3") == null) {
			eim.restartEventTimer(20 * 60000); //20 mins
			eim.setProperty("time3", 1);
			}
			break;
	case 610030400:
		if (eim.getProperty("time4") == null) {
			eim.restartEventTimer(20 * 60000); //20 mins
			eim.setProperty("time4", 1);
			}
			break;
	case 610030500:
		if (eim.getProperty("time5") == null) {
			eim.restartEventTimer(20 * 60000); //20 mins
			eim.setProperty("time5", 1);
			}
			break;
	case 610030600:
		if (eim.getProperty("time6") == null) {
			eim.restartEventTimer(60 * 60000); //60 mins
			eim.setProperty("time6", 1);
			}
			break;
	case 610030800:
		if (eim.getProperty("time8") == null) {
			eim.restartEventTimer(1 * 60000); //1 mins
			eim.setProperty("time8", 1);
			}
			break;
	default:
		if (mapid < 610030100 || mapid > 610030800) {
			playerExit(eim, chr);
}
}
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 610030020);
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
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