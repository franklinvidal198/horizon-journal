from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('user', sa.Column('name', sa.String(), nullable=False, server_default=''))
    op.alter_column('user', 'name', server_default=None)

def downgrade():
    op.drop_column('user', 'name')
