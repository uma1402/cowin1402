import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinatonCoverage = props => {
  const {last7daysvaccination} = props
  console.log(last7daysvaccination)

  const DataFormatter = number => {
    if (number > 10000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="60%" height={500}>
      <BarChart
        width={1000}
        height={300}
        data={last7daysvaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'red',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'red',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="Dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="Dose2" name="Dose2" fill="#6c757d" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinatonCoverage
