__author__ = 'Michal'

import csv
import io
class YnabError(RuntimeError): pass

def getData(filepath, start=0, count=-1, encoding='utf-8'):
    data = getData_(filepath, start, count, encoding)
    data = purgeData(data)
    sumTotal(data)
    return data

def getData_(filepath, start, count, encoding='utf-8'):
    ret = []
    with io.open(filepath, 'r', encoding=encoding) as csvfile:
        cvsreader = csv.reader(csvfile)
        for i, row in enumerate(cvsreader):
            try:
                new_row = []
                columns = len(row)
                if start < 0:
                    start = columns + start
                if count == -1:
                    count = columns - start

                for j, val in enumerate(row):
                    # Strip caption from unicode chars
                    if j == 0:
                        safe_label = ''.join([i if ord(i) < 128 else '' for i in val])
                        safe_label = safe_label.strip()
                        new_row.append(safe_label)
                    else:
                        if not (j > start and j <= start + count ):
                            continue
                        try: val2 = float(val)
                        except: val2=val
                        new_row.append(val2)
                #
                ret.append(new_row)
            except:
                print('\n\nError while parsing row: {}\n{}'.format(i+1, filepath))
                raise
        return ret



def purgeData(data):
    tmp = []
    begin_category = 'Total Income'
    ignored_categories = ['Total Income', 'Hidden Categories', 'Total Expenses', 'Net Income']
    if begin_category not in str(data):
        raise YnabError('Category not found! ({})'.format(begin_category))

    # Append header row
    tmp.append(data[0])
    skip = True
    for cat in data:
        # Disable skip if begin category found
        if skip and cat[0] == begin_category:
            skip = False

        # Skip
        if skip or cat[0] in ignored_categories: continue

        tmp.append(cat)
    #for

    # pprint(tmp)
    return tmp

def sortData(data):
    # print(data)
    pass

def sumTotal(data):
    total = ['Total']
    for col_idx, col in enumerate(data[0]):
        if col_idx == 0: continue
        sum = 0
        for row_idx, row in enumerate(data):
            # Ignore grouped categories and hidden categories
            if row_idx == 0 or '.' in row[0] or 'Hidden' in row[0]: continue
            val = float(row[col_idx])

            # Calculate only spendings
            if val < 0:
                sum += val
        # Add rounded sum
        total.append(int(sum))
        # print('total: %s' % int(sum))
    #
    data.insert(1, total)

def printData(data):
    pass
    # for row in data:
    #     print('{},'.format(row))

