/*
	名字:	卡帕萊特協會長的考驗
	地圖:	瑪迦提亞城
	描述:	261000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3303)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3303).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (getOreArray().length < 1) {
			qm.sendNext("What's this, you haven't got the #rjewel ores#k. No ores no deal!");
			qm.dispose();
			return;
			}
			qm.sendSimple("Oh, looks like someone's ready to make a deal. You want to join Alcadno so badly, huh? I really don't understand you, but that's just fine. What will you give me in return? \r\n" + getOreString(getOreArray()));
			break;
	case 1:
		select = selection;
		qm.sendNext("Then wait for awhile. I'll go and get the stuff to help you pass the test of Chief Alcadno.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3303).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(getOreArray()[select], -2);
		qm.dispose();
}
}

function getOreArray() {
	var ores = new Array();
	var y = 0;
	for (var x = 4020000; x <= 4020008; x++) {
	if (qm.getPlayer().itemQuantity(x) >1) {
		ores[y] = x;
		y++;
		}
		}
	return ores;
}

function getOreString(ids) { // Parameter 'ids' is just the array of getOreArray()
	var thestring = "#b";
	var extra;
	for (x = 0; x < ids.length; x++) {
	extra = "#L" + x + "##t" + ids[x] + "##l\r\n";
	thestring += extra;
	}
	thestring += "#k";
	return thestring;
}