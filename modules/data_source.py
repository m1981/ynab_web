__author__ = 'Michal'

import csv
import io
from locale import atof, atoi, setlocale, LC_NUMERIC
import statistics
from pprint import pprint

class YnabError(RuntimeError): pass


setlocale(LC_NUMERIC, "pl_PL")

EXCLUDED_COLUMNS_AT_BEGIN = 1
EXCLUDED_COLUMNS_AT_END = 2

def getData(filepath, start=0, count=-1, encoding='utf-8'):
    data = getData_(filepath, start, count, encoding)
    data = purgeCategories(data)
    return data

def getData_(filepath, start, count, encoding='utf-8'):
    if start < 0 and count > abs(start):
        raise RuntimeError('Columns out of scope! Start: %s, Count: %s' % (start, count))

    ret = []
    with io.open(filepath, 'r', encoding=encoding) as csvfile:
        cvsreader = csv.reader(csvfile, dialect="excel-tab")
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
                        try: val2 = int(atof(val))
                        except: val2=val
                        new_row.append(val2)
                #for
                # Adding second categories column on the right.
                new_row.append(safe_label)
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
        # if skip or cat[0] in ignored_categories or '.' in cat[0]: continue

        # Skip ignored categories
        if skip or cat[0] in ignored_categories: continue

        tmp.append(cat)
    #for
    return tmp

def sortData(data):
    # print(data)
    pass

