__author__ = 'Michal'

import unittest
import os

import modules.data_source as ds


class TestDataSource(unittest.TestCase):
    def setUp(self):
        THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
        data_file = os.path.join(THIS_FOLDER, './ynab-reports.csv')
        data = ds.getData(data_file, -10, 6)
        print('\n\n')
        ds.sumTotal(data)
        ds.printData(data)

        self.data_file = os.path.join(THIS_FOLDER, './ynab_ascii_test.csv')

    def test_load(self):
        data = ds.getData(self.data_file, 10, 3)

        self.assertEqual(data[2][0], 'Misiu jedzenie')
        self.assertEqual(data[2][2], -343.26)
        self.assertEqual(data[2][3], -507.67)
        print('\n\n')
        ds.sortData(data)


    def test_load_negative_offset(self):
        data = ds.getData(self.data_file, -4, 1)
        self.assertEqual(data[0][1], 'Oct 2018')



    def test_sum_total_spendings(self):
        data = ds.getData(self.data_file, 0, 3)

        # Test sum total
        ds.sumTotal(data)
        total_row_idx = 1
        self.assertEqual(data[total_row_idx][2], -55)


    def test_sum_total_spendings_and_income(self):
        data = ds.getData(self.data_file, 0, 3)

        # Test sum total
        ds.sumTotal(data)
        total_row_idx = 1
        self.assertEqual(data[total_row_idx][3], -120)

#
#     def test_oper(self):
#         self.assertEqual(oper( 0,  0),  0)
#
#         # Improving savings
#         self.assertEqual(oper(-3, -2),  1)
#         self.assertEqual(oper(-3,  0),  3)
#         self.assertEqual(oper( 0,  2),  2)
#         self.assertEqual(oper(-2,  2),  4)
#         self.assertEqual(oper( 2,  7),  5)
#
#         # Increased Spending
#         self.assertEqual(oper(-2, -3), -1)
#         self.assertEqual(oper( 7,  2), -5)
#         self.assertEqual(oper( 201,  -18), -5)
#
# def oper(prev, curr):
#     print('{},{} : {}'.format(prev, curr, prev - curr >= 0))
#     return curr - prev
