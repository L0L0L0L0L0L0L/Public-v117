/*
	名字:	可可島
	地圖:	淺海地帶
	描述:	3000100
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face00"));
	pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.IntroEnableUI(1));
	pi.getClient().getSession().write(Packages.tools.packet.CField.UIPacket.getDirectionInfo(3, 4));
	pi.openNpc(1096003);
	return true;
}