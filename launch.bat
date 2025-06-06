@echo off

start mysql\bin\mysqld.exe

Color 0C

:StartServer
set PATH=jre\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%
set JRE_HOME=jre
set JAVA_HOME=jre\bin
set CLASSPATH=.;lib\*;lib\graaljs\*;
java -Xmx1024m -Dnet.sf.odinms.wzpath=wz\ server.Start
pause