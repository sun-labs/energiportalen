# Dependencies
```easy_install requests```

```mkdir downloads```

# Examples

Show list of facilities

```python ***REMOVED***.py info```

Show info about one facility

```python ***REMOVED***.py --fac-id 4513 info```


Print temperature from EVERY facility with interval of days and a period of 2 days

```python ***REMOVED***.py temp --period 20171105-20171107 --interval day```

Print temperature from ONE facility with interval of hours and a period of 2 days

```python ***REMOVED***.py temp --fac 4513 --period 20171105-20171107 --interval hour```

Print temperature from ONE facility with interval of months for 2016

```python ***REMOVED***.py temp --fac 4513 --period 2016 --interval month```

Print temperature from ONE facility with interval of hours for yesterday

```python ***REMOVED***.py temp --fac 4513```

Print energy production from ONE facility with interval of hours for yesterday

```python ***REMOVED***.py energy --fac 4513```

## Store API data
Use the examples above and supply the argument `--store` (optionally with the `--output-dir` to change the path of file storage)

Download data from ONE facility between 2005 and 2017 with hourly data and store it locally

```python ***REMOVED***.py energy --fac 4513 --interval hour --period 2005-2017 --store```

Download data from EVERY facility between 2005 and 2017 with hourly data and store it locally

```python ***REMOVED***.py energy --interval hour --period 2005-2017 --store```

# Other features

Download every invoice and store them

```python ***REMOVED***.py invoices --period 2005-2017 --store```

List all the services for this account

```python ***REMOVED***.py services```

# Authentication options

## First option
Duplicate the file `CONFIG.sample.php` to `CONFIG.php` and enter the details.

## Second option
Supply the tool with the following arguments

```python ***REMOVED***.py temp --fac 4513 --username yourusername --password yourpassword```

# Install MySQL library for Python

```sudo easy_install pip```

```brew install mysql```

```sudo pip install MySQL-python```
