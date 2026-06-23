# -*- coding: utf-8 -*-
"""
Setup Windows Task Scheduler for weekly automatic paper updates.
Run this script once to set up the scheduled task.
"""
import os, sys

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
WEEKLY_SCRIPT = os.path.join(DATA_DIR, "weekly_update.py")
PYTHON_EXE = sys.executable

# Create a batch file for the scheduled task
bat_content = f"""@echo off
cd /d "{DATA_DIR}"
"{PYTHON_EXE}" weekly_update.py
"""

bat_path = os.path.join(DATA_DIR, "run_weekly_update.bat")
with open(bat_path, "w", encoding="utf-8") as f:
    f.write(bat_content)

print(f"Batch file created: {bat_path}")
print()
print("To set up weekly automatic updates, run this command in Command Prompt (as Admin):")
print()
print(f'  schtasks /create /tn "LaserShockWeeklyUpdate" /tr "{bat_path}" /sc weekly /d MON /st 09:00')
print()
print("Or to set up with PowerShell:")
print()
print(f'  Register-ScheduledTask -TaskName "LaserShockWeeklyUpdate" -Action (New-ScheduledTaskAction -Execute "{bat_path}") -Trigger (New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9am)')
print()
print("To remove the scheduled task:")
print('  schtasks /delete /tn "LaserShockWeeklyUpdate" /f')
print()
print("To manually run the weekly update:")
print(f'  "{PYTHON_EXE}" "{WEEKLY_SCRIPT}"')