"""edits subject

Revision ID: ea0c46819acd
Revises: 2b6a80b3dcf7
Create Date: 2023-10-16 09:08:48.781032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ea0c46819acd'
down_revision = '2b6a80b3dcf7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_constraint('fk_students_subject_id_subjects', type_='foreignkey')
        batch_op.drop_column('subject_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.add_column(sa.Column('subject_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_students_subject_id_subjects', 'subjects', ['subject_id'], ['id'])

    # ### end Alembic commands ###