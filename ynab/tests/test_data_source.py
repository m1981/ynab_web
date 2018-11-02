__author__ = 'Michal'

import unittest
import os

import modules.data_source as ds


class TestDataSource(unittest.TestCase):
    def setUp(self):
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        data_file = os.path.join(THIS_FOLDER, './ynab-reports.csv')
        data = ds.getData(data_file, 10, 4)
        print('\n\n')
        ds.sumTotal(data)
        ds.printData(data)

    def test_load(self):
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        data_file = os.path.join(THIS_FOLDER, './ynab_ascii_test.csv')
        data = ds.getData(data_file, 10, 3)

        self.assertEqual(data[2][0], 'Misiu jedzenie')
        self.assertEqual(data[2][2], -343.26)
        self.assertEqual(data[2][3], -507.67)
        print('\n\n')
        ds.sortData(data)

        # Test sum total
        ds.sumTotal(data)
        total_row_idx = 1
        self.assertEqual(data[total_row_idx][1], -1426)
        self.assertEqual(data[total_row_idx][5], -2219)

