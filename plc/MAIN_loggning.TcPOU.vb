<?xml version="1.0" encoding="utf-8"?>
<TcPlcObject Version="1.1.0.1" ProductVersion="3.1.4020.12">
  <POU Name="MAIN_loggning" Id="{72947dd7-2af7-418e-a96e-fb391ad9d335}" SpecialFunc="None">
    <Declaration><![CDATA[PROGRAM MAIN_loggning
VAR
(* Time and Date variables *)
	fbTime 						: FB_LocalSystemTime; (*Function to get localsystemtime*)
	systemTime 					: T_MaxString;
	localTime 					: T_MaxString;
	localDateMonth				: T_MaxString; 
	localDateMonthOld 			: T_MaxString;

	


	sColumn2: STRING(255);
END_VAR
]]></Declaration>
    <Implementation>
      <ST><![CDATA[(*Localsystemtime TimeStamp updater*)
fbTime(bEnable:=TRUE, dwCycle:= 1);
systemTime := SYSTEMTIME_TO_STRING(fbTime.systemTime);

(*Energimatare Schneider*)
iEM3255_Logg();

(*Cluster Control*)
Cluster_Logg();
Cluster_Logg_2();
Cluster_Logg_3();

(*Vaderstation*)
WXT530_Logg();


]]></ST>
    </Implementation>
    <LineIds Name="MAIN_loggning">
      <LineId Id="6" Count="1" />
      <LineId Id="18" Count="0" />
      <LineId Id="20" Count="0" />
      <LineId Id="19" Count="0" />
      <LineId Id="40" Count="2" />
      <LineId Id="60" Count="1" />
      <LineId Id="43" Count="2" />
      <LineId Id="38" Count="1" />
      <LineId Id="35" Count="0" />
      <LineId Id="5" Count="0" />
    </LineIds>
  </POU>
</TcPlcObject>