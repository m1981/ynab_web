__author__ = 'Michal'

import csv
import io
import statistics
from pprint import pprint

class YnabError(RuntimeError): pass

EXCLUDED_COLUMNS_AT_BEGIN = 1
EXCLUDED_COLUMNS_AT_END = 2

def getData(filepath, start=0, count=-1, encoding='utf-8'):
    data = getData_(filepath, start, count, encoding)
    data = purgeCategories(data)
    sumTotal(data)
    calcAverge(data)
    return data

def getData_(filepath, start, count, encoding='utf-8'):
    if start < 0 and count > abs(start):
        raise RuntimeError('Columns out of scope! Start: %s, Count: %s' % (start, count))

    ret = []
    with io.open(filepath, 'r', encoding=encoding) as csvfile:
        cvsreader = csv.reader(csvfile)
        for i, row in enumerate(cvsreader):
            try:
                new_row = []
                columns = len(row)
                if start < 0:
                    if abs(start) > columns:
                        raise RuntimeError('Offset error!. Start %s but only %s columns available.' % (start, columns))
                    start = columns + start
                    print('i:%s, st:%s' % (i, start))
                if count == -1:
                    count = columns - start
                
                safe_label =''
                for j, val in enumerate(row):
                    # Strip caption from unicode chars
                    if j == 0:
                        safe_label = ''.join([i if ord(i) < 128 else '' for i in val])
                        safe_label = safe_label.strip()
                        new_row.append(safe_label)
                    else:
                        if j < start or j > (start + count):
                            continue
                        try: val2 = float(val)
                        except: val2=val
                        new_row.append(val2)
                #for
                # Adding second categories column on the right.
                new_row.append(safe_label)
                # print(new_row)
                ret.append(new_row)
            except:
                print('\n\nError while parsing row: {}\n{}'.format(i+1, filepath))
                raise
        return ret



def purgeCategories(data):
    tmp = []
    begin_category = 'Total Income'
    ignored_categories = ['Uncategorized Transactions', 'Total Income', 'Hidden Categories', 'Total Expenses', 'Net Income']
    if begin_category not in str(data):
        raise YnabError('Category not found! ({})'.format(begin_category))

    # Append header row
    tmp.append(data[0])
    skip = True
    for cat in data:
        # Disable skip if begin category found
        if skip and cat[0] == begin_category:
            skip = False

        # Skip ignored categories and Category groups
        if skip or cat[0] in ignored_categories or '.' in cat[0]: continue

        tmp.append(cat)
    #for
    return tmp

def calcAverge(data):
    ignoreTextField = 1
    ignoreCurrentMonth = 1
    data[0].append('Average')
    for row_idx, row in enumerate(data):
        if row_idx < 1: continue
        avg = statistics.mean(row[ignoreTextField:-(ignoreCurrentMonth + ignoreTextField)])
        print(row[ignoreTextField:-(ignoreCurrentMonth + ignoreTextField)])
        row.append(avg)
    #for


def sortData(data):
    # print(data)
    pass

def sumTotal(data):
    total = ['Total']
    for col_idx, col in enumerate(data[0]):
        if col_idx == 0 or col_idx == len(data[0])-1: continue
        sum = 0
        for row_idx, row in enumerate(data):
            # Ignore grouped categories and hidden categories
            if row_idx == 0 or '.' in row[0] or 'Hidden' in row[0]:
                continue
            val =   float(row[col_idx])

            # Calculate only spendings
            if val < 0:
                sum += val
        # Add rounded sum
        total.append(int(sum))
        # print('total: %s' % int(sum))
    #for
    total.append('Total')
    data.insert(1, total)

def printData(data):
    pass

def get_month_progress():
    # 0.285
    import calendar
    import datetime
    now = datetime.datetime.now().date()
    print(now)
    year = now.year
    month = now.month
    day = now.day
    print(year)
    month_length = calendar.monthrange(year, month)[1]
    print(month_length)
    ret = day / month_length
    print(ret)
    return ret