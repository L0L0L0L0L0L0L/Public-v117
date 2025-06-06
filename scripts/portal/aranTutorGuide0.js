/*
	名字:	黑路
	地圖:	燃燒的森林1
	描述:	914000200
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("normal=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";normal=o");
		pi.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("aran/tutorialGuide1", 3));
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "To use a Regular Attack on monsters, press the Ctrl key."));
		return false;
}