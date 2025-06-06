/*
	名字:	皇后之路
	地圖:	練武場入口
	描述:	130020000
*/

var quest = [20601, 20602, 20603, 20604, 20605];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(913010200).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Try again soon."));
		return false;
		}
		pi.getMap(913010200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(913010200), pi.getMap(913010200).getPortal(1)); //第三練武場
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(130020000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "The only way you may enter the 3rd Hall is if you're training for the Level 100 skills."));
		return false;
}