SELECT * FROM home_bills
join homes on homes.home_id = home_bills.home
where home_bills.home = $1