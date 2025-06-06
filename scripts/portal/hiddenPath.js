/*
	名字:	獅子王城
	地圖:	城入口
	描述:	921110200
*/

function enter(pi) {
	if (pi.getPortal().getId() == 9) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2159336, 0, "#b(The Secret Passage should be here around somewhere.)", "00 01", 16));
		return false;
		}
	if (pi.getPortal().getId() == 10) {
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2159336, 0, "#b(Do I have to go further up?)", "00 01", 16));
		return false;
		}
		pi.startportalScript("hiddenPath");
		return true;
}

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		pi.dispose();
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
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2159336, 0, "#b(How did I travel to places like this before? I guess it wasn't a big deal for the Commanders like Arkarium who can teleport...)", "00 01", 16));
		break;
	case 1:
		pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getNPCTalk(2159336, 0, "#b(I remember being on top of that right watchtower.)", "01 01", 16));
		break;
	case 2:
		pi.dispose();
}
}