/*
	名字:	菇菇王國
	地圖:	菇菇森林路口
	描述:	106020000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroLock(0));
	ms.getClient().getSession().write(Packages.tools.packet.CField.environmentChange("temaD/enter/mushCatle", 3));
	ms.dispose();
}