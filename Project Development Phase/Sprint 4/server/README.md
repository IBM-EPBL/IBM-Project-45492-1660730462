Installation
============

### **Important:** Make sure you're in the root folder. Then execute the following commands:

 1. Setup Venv

    ```bash 
    python3 -m venv ./venv/
    ```

2. Install Requirements on venv
    
    For Linux Users:

    ```bash
    export IBM_DB_HOME="./clidriver"
    venv/bin/pip3 install -r requirements.txt
    ```

    For Windows Users (PowerShell):
    ```bash
    $env:IBM_DB_HOME="./myscript"
    venv/bin/pip3 install -r requirements.txt
    ```

    Venv will now be configured on your local system

<br>

Running the Application
===========

```bash
flask run --port=3000
```