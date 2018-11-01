select * from user_bills
join users on user_bills.bill_user = users.user_id
where user_bills.bill_user = $1