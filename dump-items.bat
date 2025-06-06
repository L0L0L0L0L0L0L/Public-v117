@echo off
@title  v.83
:StartServer
set CLASSPATH=.;dist\*;lib\graaljs\*;
java -server -Dnet.sf.odinms.wzpath=wz tools.wztosql.DumpItems
pause