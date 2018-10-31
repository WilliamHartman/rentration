select * from users
join homes on users.home = homes.home_id
where home = $1