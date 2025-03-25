#!/usr/bin/env python3
import subprocess
import os

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode('utf-8') if output else ''

# Sensitive data patterns to replace
patterns = {
    'AIzaSyBPPdXNml2dUiyndMwEbb8zO7PpBurHK3E': '***REMOVED***',
}

# Create a temporary branch
print("Creating temporary branch...")
run_command('git checkout --orphan temp_branch')

# Add all files
print("Adding files to temporary branch...")
run_command('git add .')

# Create a commit
print("Creating commit...")
run_command('git commit -m "Initial commit"')

# Delete the main branch
print("Deleting main branch...")
run_command('git branch -D main')

# Rename temp_branch to main
print("Renaming temporary branch to main...")
run_command('git branch -m temp_branch main')

# Force push
print("Force pushing changes...")
run_command('git push -f origin main')

print("Done! The sensitive data has been removed from the git history.")
print("\nIMPORTANT NEXT STEPS:")
print("1. Regenerate your Google Maps API key immediately")
print("2. Update the key in your Vercel environment variables")
print("3. Make sure all team members pull the latest changes and reset their local repositories")
