/*
	名字:	組隊任務
	地圖:	被遺忘的儲蓄室
	描述:	610030200
*/

function act() {
	switch(rm.getPlayer().getMap().getId()) {
	case 610030200:
		var nun = rm.getPlayer().getMap().getReactorByName("2skill0").getState() + rm.getPlayer().getMap().getReactorByName("2skill1").getState() + rm.getPlayer().getMap().getReactorByName("2skill2").getState() + rm.getPlayer().getMap().getReactorByName("2skill3").getState() + rm.getPlayer().getMap().getReactorByName("2skill4").getState();
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The Archer Sigil has been activated!"));
		if (nun > 4) {
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The Antellion grants you access to the next portal! Proceed!"));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("2pt", 2));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
			}
			break;
	case 610030300:
		rm.getPlayer().getMap().moveEnvironment("menhir1", 1);
		rm.getPlayer().getMap().moveEnvironment("menhir2", 1);
		var nun = rm.getPlayer().getMap().getReactorByName("3skill0").getState() + rm.getPlayer().getMap().getReactorByName("3skill1").getState() + rm.getPlayer().getMap().getReactorByName("3skill2").getState() + rm.getPlayer().getMap().getReactorByName("3skill3").getState() + rm.getPlayer().getMap().getReactorByName("3skill4").getState();
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The Archer Sigil has been activated! You hear gears turning! The Menhir Defense System is active! Run!"));
		if (nun > 4) {
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.serverNotice(5, "The Antellion grants you access to the next portal! Proceed!"));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("3pt", 2));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("quest/party/clear", 3));
			rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CField.environmentChange("Party1/Clear", 4));
}
}
}