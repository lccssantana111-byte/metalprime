-- Rebrand: Metalprime Serralheria → Metal Shark
-- Atualiza os valores da tabela site_settings para refletir a marca correta.

update site_settings set value = '"Metal Shark"'                       where key = 'company_name';
update site_settings set value = '"contato@metalshark.com.br"'         where key = 'company_email';
update site_settings set value = '"https://instagram.com/metalshark"'  where key = 'social_instagram';
update site_settings set value = '"https://facebook.com/metalshark"'   where key = 'social_facebook';
