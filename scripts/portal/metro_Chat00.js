/*
	名字:	隱藏地圖
	地圖:	廢棄的地鐵月台
	描述:	910320000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CField.EffectPacket.ShowWZEffect("Effect/Direction2.img/metro/Im"));
	return false;
}