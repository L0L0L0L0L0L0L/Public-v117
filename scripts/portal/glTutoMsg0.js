/*
	名字:	楓之島
	地圖:	小菇菇
	描述:	10000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CField.sendHint("Once you leave this area you won't be able to return.", 150, 5));
	return false;
}