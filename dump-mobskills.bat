@echo off
@title  v.83
:StartServer
set PATH=jre\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%
set JRE_HOME=jre
set JAVA_HOME=jre\bin
set CLASSPATH=.;dist\*;lib\graaljs\*;
java -server -Dnet.sf.odinms.wzpath=wz tools.wztosql.DumpMobSkills
pause