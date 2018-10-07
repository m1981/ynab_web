__author__ = 'Michal'

import csv
import io

def getData(filepath, encoding='utf-8'):
    ret = []
    with io.open(filepath, 'r', encoding=encoding) as csvfile:
        cvsreader = csv.reader(csvfile)
        for i, row in enumerate(cvsreader):
            try:
                new_row = []
                for j, val in enumerate(row):
                    if j == 0:
                        safe_label = ''.join([i if ord(i) < 128 else '' for i in val])
                        safe_label = safe_label.strip()
                        new_row.append(safe_label)
                    else:
                        try: val2 = int(float(val))
                        except: val2=val
                        new_row.append(val2)
                        if j == 6:
                            break
                print(new_row)
                #
                ret.append(new_row)
            except:
                print('\n\nError while parsing row: {}\n{}'.format(i+1, filepath))
                raise
        return ret

# DictReader
# b"OrderedDict([('Category', 'Car & Bike'), ('Mar 2017', '0.00'), ('Apr 2017', '0.00'), ('May 2017', '0.00'), ('Jun 2017', '0.00'), ('Jul 2017', '0.00'), ('Aug 2017', '0.00'), ('Sep 2017', '0.00'), ('Oct 2017', '0.00'), ('Nov 2017', '0.00'), ('Dec 2017', '0.00'), ('Jan 2018', '0.00'), ('Feb 2018', '0.00'), ('Mar 2018', '0.00'), ('Apr 2018', '0.00'), ('May 2018', '0.00'), ('Jun 2018', '-200.00'), ('Jul 2018', '-52.99'), ('Aug 2018', '-167.61'), ('Sep 2018', '-172.83'), ('Oct 2018', '0.00'), ('Average', '-29.67'), ('Total', '-593.43')])"
# b"OrderedDict([('Category', 'Cosmetics'), ('Mar 2017', '0.00'), ('Apr 2017', '-30.97'), ('May 2017', '-419.50'), ('Jun 2017', '-287.75'), ('Jul 2017', '-228.57'), ('Aug 2017', '-617.90'), ('Sep 2017', '-230.02'), ('Oct 2017', '-238.32'), ('Nov 2017', '-214.08'), ('Dec 2017', '-134.92'), ('Jan 2018', '-192.65'), ('Feb 2018', '-243.71'), ('Mar 2018', '-306.07'), ('Apr 2018', '-517.96'), ('May 2018', '-209.83'), ('Jun 2018', '-308.36'), ('Jul 2018', '-273.52'), ('Aug 2018', '-75.13'), ('Sep 2018', '-120.97'), ('Oct 2018', '0.00'), ('Average', '-232.51'), ('Total', '-4650.23')])"


