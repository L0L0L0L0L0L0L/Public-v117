/*
	名字:	意想不到的禮物II
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("從寶貝龍那裡獲得了龍的鱗片。神奇的是，鱗片剛放到手裡，就馬上變成了#t1142157#。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142157# #t1142157# 1", 3);
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(1, "裝備道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(22608).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.removeAll(4032503);
			qm.gainItem(1142157, 1);
			qm.dispose();
}
}