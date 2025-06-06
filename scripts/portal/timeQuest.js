/*
	名字:	時間之路
	地圖:	回憶之路1
	描述:	270010100
*/

var inmap = [270010100, 270010200, 270010300, 270010400, 270010500, 270020100, 270020200, 270020300, 270020400, 270020500, 270030100, 270030200, 270030300, 270030400, 270030500];

var tomap = [270010110, 270010210, 270010310, 270010410, 270020000, 270020110, 270020210, 270020310, 270020410, 270030000, 270030110, 270030210, 270030310, 270030410, 270040000];

var quest = [3501, 3502, 3503, 3504, 3507, 3508, 3509, 3510, 3511, 3514, 3515, 3516, 3517, 3518, 3519];

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)).getCustomData() != 1 && pi.getPlayer().getMap().getId() == 270010300) {
	if (pi.getMap(927000200).getCharacters().size() < 1) {
		pi.getMap(927000200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(927000200), pi.getMap(927000200).getPortal(1)); //回憶中的休息處3
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		for (var i = 0; i < inmap.length; i ++)
	if (pi.getPlayer().getMap().getId() == inmap[i])
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 2) {
		pi.getPlayer().changeMap(pi.getMap(tomap[i]), pi.getMap(tomap[i]).getPortal("out00"));
		return true;
		}
	if (pi.getPlayer().getMap().getId() == 270040000) {
	if (pi.getPlayer().itemQuantity(4032002)) {
		pi.getPlayer().changeMap(pi.getMap(270040100), pi.getMap(270040100).getPortal("out00"));
		pi.gainItem(4032002, -1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Something seems to be blocking you from entering."));
		return false;
		}
		pi.startportalScript("timeQuest");
		return true;
}

function start() {
	pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2140000, 0, "You are not allowed to enter here. \r\nThose without permission cannot change the flow of the temple and will be returned to their previous location.", "00 01", 1));
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() -(Math.floor(pi.getPlayer().getMap().getId() % 1000) == 100 ? 100 : 90)), pi.getMap(pi.getPlayer().getMap().getId() -(Math.floor(pi.getPlayer().getMap().getId() % 1000) == 100 ? 100 : 90)).getPortal(0));
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Those without permission cannot change the flow of the temple, and will returned to their previous location."));
		pi.dispose();
}