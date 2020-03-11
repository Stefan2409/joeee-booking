SELECT * FROM `ww_joeee_room_booked` rb 
join `ww_joeee_reservation` r on r.id = rb.reservation_id 
join `ww_joeee_person` p on p.id = r.person_id 
left join `ww_joeee_reservation_extra` re on re.reservation_id = r.id
left join `ww_joeee_extra` e on e.id = re.extra_id
WHERE booked_from >= MAKEDATE(YEAR(CURRENT_DATE()),DAYOFYEAR(CURRENT_DATE()) -DAYOFMONTH(CURRENT_DATE())+1);