__author__ = 'Michal'

import unittest
import os

import modules.data_source as ds
from pprint import pprint

class TestDataSource(unittest.TestCase):
    def setUp(self):
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        self.data_file = os.path.join(THIS_FOLDER, './ynab_ascii_test.csv')

    def test_load(self):
        data = ds.getData(self.data_file, 10, 3)
        self.assertEqual(data[3][0], 'Misiu jedzenie')
        self.assertEqual(data[3][2], -343.26)
        self.assertEqual(data[3][3], -507.67)


    def test_purgeData(self):
        data = ds.getData_(self.data_file, 0, -1)
        data = ds.purgeCategories(data)
        # Check if header exists
        self.assertEqual(data[0][1], 'Mar 2017')


    def test_load_negative_offset(self):
        data = ds.getData_(self.data_file, -5, 1)

        self.assertEqual(data[0][1], 'Oct 2018')

    def test_sum_total_spendings(self):
        data = ds.getData(self.data_file, 0, 3)

        total_row_idx = 1
        self.assertEqual(data[total_row_idx][2], -55)


    def test_sum_total_spendings_and_income(self):
        data = ds.getData(self.data_file, 0, 3)

        total_row_idx = 1
        self.assertEqual(data[total_row_idx][3], -120)

