__author__ = 'Michal'

import unittest
import os

from modules.data_source import getData

class TestDataSource(unittest.TestCase):
    def setUp(self):
        pass

    def test_load(self):
        # print(__file__)
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        # data_file = os.path.join(THIS_FOLDER, './ynab-reports.csv')
        data_file = os.path.join(THIS_FOLDER, './ynab_ascii_test.csv')
        data = getData(data_file)

        self.assertEqual(data[2][0], 'Misiu jedzenie')
        self.assertEqual(data[2][2], 0)
        self.assertEqual(data[2][3], -165)
