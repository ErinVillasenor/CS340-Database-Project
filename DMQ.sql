--Inputted variable names are noted with a : before them

--Add a character to the character table
INSERT INTO hxh_character (first_name,last_name,race) 
VALUES (:fname_from_text_box,:lname_from_text_box,:race_from_dropdown,:origin_from_dropdown)

--Remove a character from the character table
DELETE FROM hxh_character WHERE character_id=:id_from_delete_button

--Edit a characters data
UPDATE hxh_character SET first_name=:fname_input,last_name=:lname_input,race=:race_input,origin=:origin_input WHERE character_id=:character_id_from_edit_button

--Add a location to the location table
INSERT INTO hxh_location (name)
VALUES (:location_name)

--Remove a location from the location table
DELETE FROM hxh_location WHERE LocID=:id_from_delete_button
--Update Organization Data
UPDATE hxh_organizations SET Name=:name_input,LocID=:id_from_dropdown,Alignment=:alignment_from_dropdown WHERE OrgId=:orgId_from_button
--Add an organization to the organization table
INSERT INTO hxh_organizations(name, LocID, Alignment)
VALUES (:organization_name,:LocID,:alignment_from_dropdown)

--Remove an organization from the lcoation table
DELETE FROM hxh_organizations WHERE OrgId=:id_from_delete_button
--Select organizations for table display with their associated location name
SELECT OrgId,o.Name,l.LocId, l.name as Location,Alignment FROM hxh_organizations o 
INNER JOIN hxh_location l ON o.LocID=l.LocID ORDER BY OrgId
--Add an aura to the aura table
INSERT INTO hxh_aura_type(aura_name)
VALUES (:aura_name)

--Remove an aura from the aura table
DELETE FROM hxh_aura_type WHERE aura_id=:id_from_delete_button

--Get locations for table display and dropdowns
SELECT * FROM hxh_location
--Get character names to populate character dropdowns
SELECT * FROM hxh_character
--select characters for table display
SELECT character_id as `Id`, first_name as `First`, last_name as `Last`, race as `Race` FROM hxh_character
--Get Aura names to populate aura dropdowns
SELECT * FROM hxh_aura_type

--Get Org names to populate Org dropdowns
Select * FROM hxh_organizations

--Add character character relationship
INSERT INTO hxh_character_relationships (character_friends,character_id1,character_id2) 
VALUES (:friend_or_foe_dropdown, :character_dropdown1, :character_dropdown2)
INSERT INTO hxh_character_relationships (character_friends,character_id1,character_id2) 
VALUES (:friend_or_foe_dropdown, :character_dropdown2, :character_dropdown1)


--Delete character character relationship
DELETE FROM hxh_character_relationships WHERE character_id1=:character_dropdown1 AND character_id2=:character_dropdown2
DELETE FROM hxh_character_relationships WHERE character_id1=:character_dropdown2 AND character_id2=:character_dropdown1

--Select character's related characters for display and management
SELECT first_name, last_name, character_friends FROM hxh_character_relationships r 
INNER JOIN hxh_character c ON r.character_id1=c.character_id 
WHERE r.character_id1=:character_dropdown

--Delete character organization relationships
DELETE FROM hxh_CharOrg WHERE character_id=:character_dropdown AND OrgId=:org_delete_button

--Add character organization relationship
INSERT INTO hxh_CharOrg (character_id, OrgId) 
VALUES (:character_dropdown,:Org_dropdown)

--Select Characters associated organizations
SELECT o.name FROM hxh_organizations o
INNER JOIN hxh_CharOrg co ON o.OrgId=co.OrgId
INNER JOIN hxh_character c ON co.character_id=c.character_id
WHERE c.character_id=:character_dropdown

--select auras for table display
SELECT aura_id as Id, aura_name as Aura FROM hxh_aura_type
--Add character aura relationship
INSERT INTO hxh_CharAura (character_id, aura_id) 
VALUES (:character_dropdown, :aura_dropdown)

--Delete character aura relationship
DELETE FROM hxh_CharAura WHERE character_id=:character_dropdown AND aura_id=:aura_dropdown

--Select character's associated auras
SELECT aura_name FROM hxh_aura_type a
INNER JOIN hxh_CharAura ca ON a.aura_id=ca.aura_id
INNER JOIN hxh_character c ON ca.character_id=c.character_id
WHERE character_id=:character_dropdown