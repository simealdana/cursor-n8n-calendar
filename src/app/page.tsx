"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Users,
  Coffee,
  BookOpen,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useRooms } from "@/hooks/useRooms";
import { useSlots } from "@/hooks/useSlots";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ToastContainer";
import {
  getSelectedDateForAPIAtMidnight,
  createTimeSlotString,
  getSelectedSlotDates,
} from "@/utils/dateHelpers";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [email, setEmail] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const { rooms, loading, error } = useRooms();
  const {
    createReservation,
    loading: reservationLoading,
    error: reservationError,
  } = useCreateReservation();
  const { toasts, showError, showSuccess, removeToast } = useToast();

  const {
    slots,
    loading: slotsLoading,
    error: slotsError,
    refresh: refreshSlots,
  } = useSlots({
    date: getSelectedDateForAPIAtMidnight(selectedDate, "America/New_York"),
    roomId: selectedRoom,
  });

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0].id);
    }
  }, [rooms, selectedRoom]);

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  useEffect(() => {
    if (slotsError) {
      showError(slotsError);
    }
  }, [slotsError, showError]);

  useEffect(() => {
    if (reservationError) {
      showError(reservationError);
    }
  }, [reservationError, showError]);

  const timeSlots = useMemo(() => {
    if (
      !slots ||
      !slots.slots ||
      !Array.isArray(slots.slots) ||
      slots.slots.length === 0
    )
      return [];

    return slots.slots
      .filter(
        (slot: {
          startDate: string;
          endDate: string;
          status: string;
          id: string;
        }) => slot && slot.startDate && slot.endDate
      )
      .map(
        (slot: {
          startDate: string;
          endDate: string;
          status: string;
          id: string;
        }) => ({
          timeString: createTimeSlotString(slot.startDate, slot.endDate),
          status: slot.status,
          id: slot.id,
        })
      );
  }, [slots]);

  const getRoomDisplayProps = (index: number) => {
    const icons = [Users, BookOpen, Coffee];
    const colors = [
      "bg-blue-50 border-blue-200",
      "bg-green-50 border-green-200",
      "bg-orange-50 border-orange-200",
    ];

    return {
      icon: icons[index % icons.length],
      color: colors[index % colors.length],
    };
  };

  const generateCalendarDays = () => {
    const today = new Date();
    return Array.from({ length: 8 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const handleReservation = async () => {
    if (!isFormValid) return;

    const selectedSlot = timeSlots.find(
      (slot) => slot.timeString === selectedTime
    );
    const isOccupied = selectedSlot?.status === "reserved";

    if (isOccupied) {
      setShowFeedback("error");
      return;
    }
    const slotDates = getSelectedSlotDates(selectedTime, selectedDate);
    if (!slotDates) {
      showError("Invalid time slot selected");
      return;
    }

    const result = await createReservation({
      roomId: selectedRoom,
      startDate: slotDates.startDate,
      endDate: slotDates.endDate,
      name: "Meeting",
      description: "Reservation created via web interface",
      attendees: [email],
    });

    if (result.success) {
      showSuccess("Reservation created successfully!");
      await refreshSlots();
      setSelectedTime("");
      setEmail("");
    } else {
      showError(result.error || "Failed to create reservation");
    }
  };

  const isFormValid =
    selectedDate && selectedTime && selectedRoom && email.includes("@");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Room Reservations
          </h1>
          <p className="text-slate-600">
            Find and reserve your ideal space in seconds
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Select the date
            </label>

            <div
              className="p-6 bg-slate-50 rounded-xl cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {selectedDate ? (
                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-800">
                    {selectedDate}
                  </div>
                  <div className="text-sm text-slate-500">Change date</div>
                </div>
              ) : (
                <div className="text-center text-slate-500">
                  <div className="text-lg">Click to choose date</div>
                  <div className="text-sm">Calendar available</div>
                </div>
              )}
            </div>

            {showCalendar && (
              <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="grid grid-cols-2 gap-2">
                  {generateCalendarDays().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(formatDate(date));
                        setShowCalendar(false);
                      }}
                      className="p-3 text-sm rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all text-left"
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Choose the time
            </label>

            {slotsLoading && (
              <div className="text-center py-8 text-slate-500">
                Loading time slots...
              </div>
            )}

            {!slotsLoading && !slotsError && timeSlots.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No time slots available
              </div>
            )}

            {!slotsLoading && timeSlots.length > 0 && (
              <div className="max-h-64 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTime(slot.timeString)}
                      disabled={slot.status === "reserved"}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedTime === slot.timeString
                          ? "bg-blue-500 border-blue-500 text-white"
                          : slot.status === "reserved"
                          ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
                          : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {slot.timeString}
                      {slot.status === "reserved" && (
                        <div className="text-xs mt-1">Occupied</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4">
              Select the room
            </label>

            {loading && (
              <div className="text-center py-8 text-slate-500">
                Loading rooms...
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-500">
                Error: {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-3">
                {rooms.map((room, index) => {
                  const displayProps = getRoomDisplayProps(index);
                  const IconComponent = displayProps.icon;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedRoom === room.id
                          ? "border-blue-500 bg-blue-50"
                          : `border-slate-200 ${displayProps.color} hover:border-blue-300`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedRoom === room.id
                              ? "bg-blue-500 text-white"
                              : "bg-white text-slate-600"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {room.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            Room {room.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Your email address
            </label>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-slate-800"
              />
              <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <button
            onClick={handleReservation}
            disabled={!isFormValid || reservationLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isFormValid && !reservationLoading
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {reservationLoading ? "CREATING RESERVATION..." : "RESERVE"}
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            {showFeedback === "success" ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Done!</h3>
                <p className="text-slate-600">Your room is reserved.</p>
              </>
            ) : (
              <>
                <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Sorry</h3>
                <p className="text-slate-600">
                  That time slot is no longer available. Choose another one.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Home;
