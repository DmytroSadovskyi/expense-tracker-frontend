import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { Transaction } from '../TransactionTable/props.ts';

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
      fontWeight: 200,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
      fontWeight: 800,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Inter' },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  table: {
    display: 'flex',
    width: '100%',
  },
  row: { flexDirection: 'row' },

  header: { backgroundColor: '#f2f2f2', fontWeight: 'bold' },
  headerCell: {
    fontSize: 10,
    textAlign: 'center',
    width: '16.6%',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },

  cell: {
    fontSize: 9,
    textAlign: 'center',
    width: '16.6%',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export const TransactionTablePDF = ({
  transactions,
}: {
  transactions: Transaction[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text y={0} x={0} style={styles.title}>
        Список транзакцій
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text y={0} x={0} style={styles.cell}>
            ID
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            Тип
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            Категорія
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            Опис
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            Сума
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            Дата
          </Text>
        </View>

        {transactions.map((txn, index) => (
          <View key={index} style={styles.row}>
            <Text y={0} x={0} style={styles.cell}>
              {txn._id}
            </Text>
            <Text y={0} x={0} style={styles.cell}>
              {txn.type}
            </Text>
            <Text y={0} x={0} style={styles.cell}>
              {txn.category}
            </Text>
            <Text y={0} x={0} style={styles.cell}>
              {txn.description}
            </Text>
            <Text y={0} x={0} style={styles.cell}>
              {txn.amount} грн
            </Text>
            <Text y={0} x={0} style={styles.cell}>
              {txn.date}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TransactionTablePDF;
