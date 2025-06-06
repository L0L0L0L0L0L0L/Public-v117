package server;

import client.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import constants.QuickMove;
import database.DatabaseConnection;
import handling.MapleServerHandler;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import static handling.login.LoginServer.TIMEZONE;
import handling.world.World;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.TimeZone;
import java.util.concurrent.atomic.AtomicInteger;
import server.Timer.BuffTimer;
import server.Timer.EtcTimer;
import server.Timer.EventTimer;
import server.Timer.MapTimer;
import server.Timer.PingTimer;
import server.Timer.PokeTimer;
import server.Timer.WorldTimer;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.maps.MapleMapFactory;
import server.quest.MapleQuest;

public class Start {

    public static long startTime = System.currentTimeMillis();
    public static final Start instance = new Start();
    public static AtomicInteger CompletedLoadingThreads = new AtomicInteger(0);

    public void run() throws InterruptedException {
        System.setProperty("net.sf.odinms.wzpath", "wz"); //支援Java16
        System.setProperty("polyglot.js.nashorn-compat", "true");
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = 0");
            ps.executeUpdate();
            ps.close();
            
         /*  ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerch");
            ps.executeUpdate();
            ps.close();
            
            ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerchequipment");
            ps.executeUpdate();
            ps.close();
            
                        ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerchitems");
            ps.executeUpdate();
            ps.close();*/
        } catch (SQLException ex) {
            System.out.println(ex);
        }
        World.init();
        WorldTimer.getInstance().start();
        PokeTimer.getInstance().start();
        EtcTimer.getInstance().start();
        MapTimer.getInstance().start();
        EventTimer.getInstance().start();
        BuffTimer.getInstance().start();
        PingTimer.getInstance().start();
        System.out.println("Loader 1...");
        MapleGuildRanking.getInstance().load();
        MapleGuild.loadAll(); //(this); 
        System.out.println("Loader 2...");
        MapleFamily.loadAll(); //(this); 
        System.out.println("Loader 3...");
        MapleLifeFactory.loadQuestCounts();
        MapleQuest.initQuests();
        System.out.println("Loader 4...");
        MapleItemInformationProvider.getInstance().runEtc(); 
        System.out.println("Loader 5...");
        MapleMonsterInformationProvider.getInstance().load(); 
        System.out.println("Loader 6...");
        MapleItemInformationProvider.getInstance().runItems(); 
        System.out.println("Loader 7...");
        SkillFactory.load();
        System.out.println("Loader 8...");
        LoginInformationProvider.getInstance();
        RandomRewards.load();
        MapleOxQuizFactory.getInstance();
        MapleCarnivalFactory.getInstance();
        CharacterCardFactory.getInstance().initialize();
        MobSkillFactory.getInstance();
        SpeedRunner.loadSpeedRuns();
        MTSStorage.load();
        System.out.println("Loader 9...");
        MapleInventoryIdentifier.getInstance();
        System.out.println("Loader 10...");
        CashItemFactory.getInstance().initialize(); 

        MapleServerHandler.initiate();
        System.out.println("[Loading Login]");
        LoginServer.run_startup_configurations();
        System.out.println("[Login Initialized]");

        System.out.println("[Loading Channel]");
        ChannelServer.startChannel_Main();
        System.out.println("[Channel Initialized]");

        System.out.println("[Loading CS]");
        CashShopServer.run_startup_configurations();
        System.out.println("[CS Initialized]");

        World.registerRespawn();
        PlayerNPC.loadAll();// touch - so we see database problems early...
        MapleMonsterInformationProvider.getInstance().addExtra();
        MapleMapFactory.loadClearedMaps();  
        LoginServer.setOn(); //now or later
        QuickMove.QuickMoveLoad();
        TimeZone.setDefault(TimeZone.getTimeZone(TIMEZONE));
        System.out.println("[Fully Initialized in " + ((System.currentTimeMillis() - startTime) / 1000) + " seconds]");
        RankingWorker.run();
    }

    public static void main(final String args[]) throws InterruptedException {
        instance.run();
    }
}