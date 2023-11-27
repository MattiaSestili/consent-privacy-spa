import React, { useEffect, useMemo, useState } from "react"
import { FC } from "react"
import { ConsentForm, useConsent } from "../../Providers/userConsentsProvider"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material"
import { toast } from "react-toastify"

export const CollectedConsents: FC = () => {
  const [data, setData] = useState<ConsentForm[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const { getConsents } = useConsent()

  useEffect(() => {
    const fetchUserConsents = async () => {
      const consents = await getConsents()
      setData(consents)
    }

    toast.promise(fetchUserConsents, {
      pending: "Fetching consents...",
      success: "Consents fetched!",
      error: "Could not fetch consents"
    })
  }, [getConsents])

  const visibleRows = useMemo(() => [...data].slice(currentPage * 2, currentPage * 2 + 2), [data, currentPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{"Name"}</TableCell>
            <TableCell>{"Email"}</TableCell>
            <TableCell>{"Consent Given For"}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.consents.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2]}
              colSpan={3}
              count={data.length}
              rowsPerPage={2}
              page={currentPage}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
