/*
	名字:	猶他家
	地圖:	小閣樓
	描述:	100030100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("hand=o") != -1) {
		return false;
		}
		pi.startportalScript("evanRoom1");
		return true;
}

function start() {
	pi.getClient().getSession().write(Packages.tools.packet.CField.NPCPacket.getEvanTutorial("UI/tutorial/evan/0/0"));
}

function action(mode, type, selection) {
	if (mode > 0)
		pi.dispose();
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";hand=o");
		pi.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/evanTutorial/evanBalloon70"));
}