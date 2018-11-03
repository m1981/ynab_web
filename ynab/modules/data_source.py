__author__ = 'Michal'

import csv
import io

def getData(filepath, start=0, skip_end=0, encoding='utf-8'):
    ret = []
    with io.open(filepath, 'r', encoding=encoding) as csvfile:
        cvsreader = csv.reader(csvfile)
        for i, row in enumerate(cvsreader):
            try:
                new_row = []
                columns = len(row)
                for j, val in enumerate(row):
                    if j == 0:
                        safe_label = ''.join([i if ord(i) < 128 else '' for i in val])
                        safe_label = safe_label.strip()
                        new_row.append(safe_label)
                    else:
                        if not (j > start and j <= columns - skip_end):
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
    for row in data:
        print('{},'.format(row))

