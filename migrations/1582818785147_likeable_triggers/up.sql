CREATE OR REPLACE FUNCTION insert_likeable_post ()
    RETURNS TRIGGER
    AS $BODY$
DECLARE
    active_account boolean;
BEGIN
    INSERT INTO "Likeable" (post_id, post_comment_id)
        VALUES (new.id, NULL);
    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_likeable_post_comment ()
    RETURNS TRIGGER
    AS $BODY$
DECLARE
    active_account boolean;
BEGIN
    INSERT INTO "Likeable" (post_id, post_comment_id)
        VALUES (NULL, new.id);
    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER insert_likeable_for_post_comment
    AFTER INSERT ON "PostComment"
    FOR EACH ROW
    EXECUTE PROCEDURE insert_likeable_post_comment ();

CREATE TRIGGER insert_likeable_for_post
    AFTER INSERT ON "Post"
    FOR EACH ROW
    EXECUTE PROCEDURE insert_likeable_post ();

