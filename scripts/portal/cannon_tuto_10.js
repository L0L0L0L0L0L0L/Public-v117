/*
	名字:	鯨魚號
	地圖:	寢室
	描述:	912060500
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(0));
	return true;
}