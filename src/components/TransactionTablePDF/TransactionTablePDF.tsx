import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import tableData from '../../../data/table.json';
import { Transaction } from '../TransactionTable/props.ts';

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
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

const {
  titleText,
  fifthColumnText,
  secondColumnText,
  thirdColumnText,
  fourthColumnText,
  sixthColumnText,
  firstColumnText,
} = tableData;

export const TransactionTablePDF = ({
  transactions,
}: {
  transactions: Transaction[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text y={0} x={0} style={styles.title}>
        {titleText}
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text y={0} x={0} style={styles.cell}>
            {firstColumnText}
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            {secondColumnText}
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            {thirdColumnText}
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            {fourthColumnText}
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            {fifthColumnText}
          </Text>
          <Text y={0} x={0} style={styles.cell}>
            {sixthColumnText}
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
