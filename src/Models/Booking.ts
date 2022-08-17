import { RowDataPacket } from 'mysql2'

export interface Booking extends RowDataPacket {
    booking_id: number
    server_id: string
    user_id: string
    date_booked: string
    time_booked: string
    created: Date
}