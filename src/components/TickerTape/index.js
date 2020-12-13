/**
 * Created by J.Vidya Sagar on 12/11/20.
 */

// import React from 'react'
//
// import './style.scss'
//
// const CoinRow = ({name, coinCount}) => {
//     const choiceNums = [...Array(coinCount).keys()].map(n => n + 1)
//
//     return (
//         <>
//             <ul className={'coinList'}>
//             {
//                 choiceNums.map((cnum, index) =>
//                         <li key={cnum} className={'coinListItem'}>
//                             {' '}
//                         </li>
//                 )
//             }
//             </ul>
//         </>
//     );
// }
//
// const KeyPad = ({name, coinCount, updateCoinCounts}) => {
//     const choiceNums = [...Array(coinCount).keys()].map(n => n + 1)
//
//     const choiceNumClick = e => {
//         console.log(`choiceNumClick(): e: ${e}`)
//         const cNum = parseInt(e.target.dataset.choice)
//
//         const letMap = {
//             'A': 0,
//             'B': 1,
//             'C': 2,
//             'D': 3,
//             'E': 4
//         }
//
//         updateCoinCounts(letMap[name], cNum)
//         console.log(`chosen: heap-count = ${name}-${cNum}`)
//     }
//
//     return (
//         <>
//             <ul className={'choiceNumList'}>
//             {
//                 choiceNums.map((cnum, index) =>
//                         <li key={cnum} className={'choiceNumItem'} onClick={choiceNumClick}  data-choice={cnum}>
//                             {cnum}
//                         </li>
//                 )
//             }
//         </ul>
//         </>
//     );
// }
//
// export default function TickerTape({name, coinCount, updateCoinCounts}) {
//     console.log("TickerTape: start")
//
//     return (
//         <div className={'movesRecordContainer'}>
//             <div className={'xyz'}>
//                 <h4 className={'xyz'}> Moves Record</h4>
//                 {/*<h4 className={'heapName'}>{name}</h4>*/}
//                 {/*<CoinRow name={name} coinCount={coinCount}/>*/}
//                 {/*<KeyPad name={name}  coinCount={coinCount} updateCoinCounts={updateCoinCounts}/>*/}
//             </div>
//         </div>
//     );
// }



import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

function TickerTape({movesLog}) {
    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: 'Name',
    //             columns: [
    //                 {
    //                     Header: 'First Name',
    //                     accessor: 'firstName',
    //                 },
    //                 {
    //                     Header: 'Last Name',
    //                     accessor: 'lastName',
    //                 },
    //             ],
    //         },
    //         {
    //             Header: 'Info',
    //             columns: [
    //                 {
    //                     Header: 'Age',
    //                     accessor: 'age',
    //                 },
    //                 {
    //                     Header: 'Visits',
    //                     accessor: 'visits',
    //                 },
    //                 {
    //                     Header: 'Status',
    //                     accessor: 'status',
    //                 },
    //                 {
    //                     Header: 'Profile Progress',
    //                     accessor: 'progress',
    //                 },
    //             ],
    //         },
    //     ],
    //     []
    // )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Move #',
                accessor: 'Move #',
            },
            {
                Header: 'Made by',
                accessor: 'Made by',

            },
            {
                Header: 'Before',
                accessor: 'Before',
            },
            {
                Header: 'Move',
                accessor: 'Move',
            },
            {
                Header: 'After',
                accessor: 'After',
            },
            //
            //
            // {
            //     Header: 'Name',
            //     columns: [
            //         {
            //             Header: 'First Name',
            //             accessor: 'firstName',
            //         },
            //         {
            //             Header: 'Last Name',
            //             accessor: 'lastName',
            //         },
            //     ],
            // },
            // {
            //     Header: 'Info',
            //     columns: [
            //         {
            //             Header: 'Age',
            //             accessor: 'age',
            //         },
            //         {
            //             Header: 'Visits',
            //             accessor: 'visits',
            //         },
            //         {
            //             Header: 'Status',
            //             accessor: 'status',
            //         },
            //         {
            //             Header: 'Profile Progress',
            //             accessor: 'progress',
            //         },
            //     ],
            // },
        ],
        []
    )

    // const data = React.useMemo(() => makeData(20), [])
    const data = React.useMemo(() => movesLog, [movesLog])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default TickerTape
