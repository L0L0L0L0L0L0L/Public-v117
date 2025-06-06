/*
	名字:	時間之路
	地圖:	三扇門
	描述:	270000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3507)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(270010000), pi.getMap(270010000).getPortal(0));
		return true;
		}
		pi.startportalScript("gate_intoPast");
		return true;
}

function start() {
	var chat = "lf you are qualified, l can send you to wherever wish to go, even to the ends of time. But ONLY if you are qualified. Where do you wish to go?#b";
	chat += "\r\n#L10000#Past of the Verdure";
	chat += "\r\n#L20000#Frozen Past";

	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3514)).getStatus() > 1) {
	chat += "\r\n#L30000#Burning Past";
	}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3521)).getStatus() > 1) {
	chat += "\r\n#L40000#Broken Corridor";
	}
	pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2140004, 5, chat, "", 0));
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.dispose();
		pi.getPlayer().changeMap(pi.getMap(270000000 + selection), pi.getMap(270000000 + selection).getPortal(0));
}